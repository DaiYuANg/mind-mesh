use crate::app_state::AppState;
use crate::commands::file_commands::greet;
use crate::commands::file_commands::select_directory;
use crate::ui::tab_manager::TabManager;
use directories::ProjectDirs;
use migration::{Migrator, MigratorTrait};
use std::time::Duration;
#[cfg(target_os = "macos")]
use tauri::TitleBarStyle;
use tauri::{Manager, WebviewUrl, WebviewWindowBuilder};
use tauri_plugin_store::StoreBuilder;
use tokio::fs;
use tokio::sync::Mutex;
use tracing::info;

mod app_state;
mod commands;
mod git;
mod model;
mod ui;

async fn init_app_state() -> AppState {
  // 获取项目特定的目录（跨平台支持）
  let project_dirs = ProjectDirs::from("org", "daiyuang", "mindmesh")
    .ok_or("无法获取项目目录")
    .unwrap();

  // 数据目录
  let data_dir = project_dirs.data_dir();

  // 确保目录存在
  fs::create_dir_all(&data_dir).await.unwrap();

  let db_path = data_dir.join("database.sqlite");
  println!("数据库路径: {:?}", db_path);

  let db_url = format!("sqlite://{}?mode=rwc", db_path.to_string_lossy());

  println!("连接字符串: {}", db_url);

  // 连接到数据库
  let connection = sea_orm::Database::connect(db_url).await.unwrap();

  // 运行迁移
  Migrator::up(&connection, None).await.unwrap();

  AppState {}
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub async fn run() {
  tauri::async_runtime::set(tokio::runtime::Handle::current());
  let state = init_app_state().await;
  tauri::Builder::default()
    .plugin(tauri_plugin_clipboard_manager::init())
    .plugin(tauri_plugin_dialog::init())
    .plugin(tauri_plugin_store::Builder::new().build())
    .plugin(tauri_plugin_notification::init())
    .plugin(
      tauri_plugin_log::Builder::new()
        .level(tauri_plugin_log::log::LevelFilter::Info)
        .build(),
    )
    .plugin(tauri_plugin_global_shortcut::Builder::new().build())
    .plugin(tauri_plugin_os::init())
    .plugin(tauri_plugin_opener::init())
    .enable_macos_default_menu(true)
    .setup(move |app| {
      let mut win_builder = WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
        .inner_size(1000.0, 800.0)
        .resizable(true)
        .devtools(true)
        .center();

      // Windows 无系统装饰
      #[cfg(target_os = "windows")]
      {
        info!("custom windows decorations");
        win_builder = win_builder
          .decorations(false)
          .shadow(true)
          .transparent(true);
      }

      // set transparent title bar only when building for macOS
      #[cfg(target_os = "macos")]
      let win_builder = win_builder
        .title_bar_style(TitleBarStyle::Overlay)
        .inner_size(1000.0, 800.0)
        .center()
        .hidden_title(true);

      let _window = win_builder.build().unwrap();

      // set background color only when building for macOS
      #[cfg(target_os = "macos")]
      {
        use cocoa::appkit::{NSColor, NSWindow};
        use cocoa::base::{id, nil};

        let ns_window = window.ns_window().unwrap() as id;
        unsafe {
          let bg_color = NSColor::colorWithRed_green_blue_alpha_(
            nil,
            60.0 / 255.0,
            158.0 / 255.0,
            163.5 / 255.0,
            1.0,
          );
          ns_window.setBackgroundColor_(bg_color);
        }
      }

      let store = StoreBuilder::new(app.handle(), "projects.json")
        .auto_save(Duration::from_mins(1))
        .build();
      app.manage(store);
      app.manage(Mutex::new(state));
      app.manage(std::sync::Mutex::new(TabManager::new()));
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![greet, select_directory])
    // .invoke_handler(tauri::generate_handler![list_projects, register_project,open_project])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
