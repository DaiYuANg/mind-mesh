use tauri::AppHandle;
use tauri_plugin_dialog::DialogExt;

#[tauri::command]
pub fn greet(name: &str) -> String {
  format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
pub async fn select_directory(app: AppHandle) -> Result<String, ()> {
  let folder = app.dialog().file().blocking_pick_folder().unwrap();
  Ok(folder.to_string())
}
