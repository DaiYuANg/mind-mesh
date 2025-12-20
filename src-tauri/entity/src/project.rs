use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Project {
  pub id: String,
  pub name: String,
  pub path: String,
  pub pinned: bool,
}
