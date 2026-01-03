use crate::ui::tab_manager::TabManager;

#[tauri::command]
fn create_tab(state: tauri::State<std::sync::Mutex<TabManager>>, path: Option<String>, content: String) -> u64 {
    let mut mgr = state.inner().lock().unwrap();
    mgr.new_tab(path, content)
}

#[tauri::command]
fn close_tab(state: tauri::State<std::sync::Mutex<TabManager>>, id: u64) {
    let mut mgr = state.inner().lock().unwrap();
    mgr.close_tab(id);
}

#[tauri::command]
fn set_active_tab(state: tauri::State<std::sync::Mutex<TabManager>>, id: u64) {
    let mut mgr = state.inner().lock().unwrap();
    mgr.set_active(id);
}

#[tauri::command]
fn update_tab_content(state: tauri::State<std::sync::Mutex<TabManager>>, id: u64, content: String) {
    let mut mgr = state.inner().lock().unwrap();
    mgr.update_content(id, content);
}

#[tauri::command]
fn get_tab_content(state: tauri::State<std::sync::Mutex<TabManager>>, id: u64) -> Option<String> {
    let mgr = state.inner().lock().unwrap();
    mgr.tabs.get(&id).map(|t| t.content.clone())
}

#[tauri::command]
fn list_tabs(state: tauri::State<std::sync::Mutex<TabManager>>) -> Vec<u64> {
    // 返回当前所有 tab ID（可以扩展成对象）
    let mgr = state.inner().lock().unwrap();
    mgr.tabs.keys().cloned().collect()
}
