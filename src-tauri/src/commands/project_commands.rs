// use crate::model::project::Project;
// use chrono::Utc;
// use std::path::Path;
// use tauri::Runtime;
// use tauri::State;
// use tauri_plugin_store::Store;
// use uuid::Uuid;
// #[tauri::command]
// pub fn register_project<R: Runtime>(
//   store: State<'_, Store<R>>,
//   path: String,
// ) -> Result<Project, String> {
//   let mut projects: Vec<Project> = store
//     .get("projects")
//     .and_then(|v| serde_json::from_value(v).ok())
//     .unwrap_or_default();
//
//   // 已存在：直接返回
//   if let Some(p) = projects.iter().find(|p| p.path == path) {
//     return Ok(p.clone());
//   }
//
//   let project = Project {
//     id: Uuid::new_v4().to_string(),
//     name: Path::new(&path)
//       .file_name()
//       .unwrap_or_default()
//       .to_string_lossy()
//       .to_string(),
//     path,
//     created_at: Utc::now(),
//     last_opened: None,
//     pinned: false,
//   };
//
//   projects.push(project.clone());
//
//   store.set("projects", serde_json::to_value(&projects).unwrap());
//   store.save().map_err(|e| e.to_string())?;
//
//   Ok(project)
// }
//
// #[tauri::command]
// pub fn list_projects<R: Runtime>(
//   store: State<'_, Store<R>>,
// ) -> Vec<Project> {
//   store
//     .get("projects")
//     .and_then(|v| serde_json::from_value(v).ok())
//     .unwrap_or_default()
// }
//
// #[tauri::command]
// pub fn open_project<R: Runtime>(
//   store: State<'_, Store<R>>,
//   project_id: String,
// ) -> Result<(), String> {
//   let mut projects: Vec<Project> = store
//     .get("projects")
//     .and_then(|v| serde_json::from_value(v).ok())
//     .unwrap_or_default();
//
//   if let Some(p) = projects.iter_mut().find(|p| p.id == project_id) {
//     p.last_opened = Some(Utc::now());
//   }
//
//   store.set("projects", serde_json::to_value(projects).unwrap());
//   store.save().map_err(|e| e.to_string())
// }
