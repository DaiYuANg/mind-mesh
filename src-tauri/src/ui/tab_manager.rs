use std::collections::HashMap;

#[derive(Clone)]
pub struct Tab {
  pub id: u64,
  pub path: Option<String>, // None 代表新建未保存
  pub content: String,
  pub modified: bool,
}

pub struct TabManager {
  pub(crate) tabs: HashMap<u64, Tab>,
  next_id: u64,
  active: Option<u64>,
}

impl TabManager {
  pub fn new() -> Self {
    Self {
      tabs: HashMap::new(),
      next_id: 1,
      active: None,
    }
  }

  pub fn new_tab(&mut self, path: Option<String>, content: String) -> u64 {
    let id = self.next_id;
    self.next_id += 1;

    let tab = Tab {
      id,
      path,
      content,
      modified: false,
    };

    self.tabs.insert(id, tab);
    self.active = Some(id);
    id
  }

  pub fn close_tab(&mut self, id: u64) {
    self.tabs.remove(&id);
    if self.active == Some(id) {
      self.active = self.tabs.keys().next().cloned();
    }
  }

  pub fn set_active(&mut self, id: u64) {
    if self.tabs.contains_key(&id) {
      self.active = Some(id);
    }
  }

  pub fn update_content(&mut self, id: u64, content: String) {
    if let Some(tab) = self.tabs.get_mut(&id) {
      tab.content = content;
      tab.modified = true;
    }
  }
}
