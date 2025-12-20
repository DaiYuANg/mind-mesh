use crate::app_state::AppState;
use crate::commands::file_commands::greet;
use crate::commands::file_commands::select_directory;
use std::time::Duration;
use tauri::{Manager, TitleBarStyle, WebviewUrl, WebviewWindowBuilder};
use tauri_plugin_store::StoreBuilder;
use tokio::sync::Mutex;

mod app_state;
mod commands;
mod model;

fn init_app_state() -> AppState {
  // let home_dir = UserDirs::new()
  //   .expect("无法获取 home 目录")
  //   .home_dir()
  //   .to_path_buf();
  //
  // let db_dir = home_dir.join(".mindmesh");
  // let db_path = db_dir.join("metadata.redb");
  //
  // // 确保父目录存在
  // if let Err(e) = fs::create_dir_all(&db_dir) {
  //   panic!("无法创建目录 {:?}: {}", db_dir, e);
  // }
  //
  // println!("Database path: {:?}", db_path);
  // assert!(db_dir.exists(), "父目录不存在");
  // let db = Database::create(db_path).expect("无法创建数据库");
  //
  // AppState { db: Arc::new(db) }
  AppState {}
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::async_runtime::set(tokio::runtime::Handle::current());
  let state = init_app_state();
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
    .plugin(tauri_plugin_window_state::Builder::new().build())
    .plugin(tauri_plugin_os::init())
    .plugin(tauri_plugin_opener::init())
    .enable_macos_default_menu(true)
    .setup(move |app| {
      let win_builder = WebviewWindowBuilder::new(app, "main", WebviewUrl::default())
        .inner_size(1000.0, 800.0)
        .center();

      // set transparent title bar only when building for macOS
      #[cfg(target_os = "macos")]
      let win_builder = win_builder
        .title_bar_style(TitleBarStyle::Overlay)
        .inner_size(1000.0, 800.0)
        .center()
        .hidden_title(true);

      let window = win_builder.build().unwrap();

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
      Ok(())
    })
    .invoke_handler(tauri::generate_handler![greet, select_directory])
    // .invoke_handler(tauri::generate_handler![list_projects, register_project,open_project])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
