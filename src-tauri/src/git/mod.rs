use anyhow::{Context, Result};
use git2::{IndexAddOption, Repository, Status, StatusOptions};

pub struct RepositoryManager;

impl RepositoryManager {
  /// 初始化一个新的 Git 仓库
  pub fn init_repo(path: &str) -> Result<Repository> {
    let repo =
      Repository::init(path).with_context(|| format!("Failed to init repository at {}", path))?;
    Ok(repo)
  }

  /// 打开已存在的仓库
  pub fn open_repo(path: &str) -> Result<Repository> {
    let repo =
      Repository::open(path).with_context(|| format!("Failed to open repository at {}", path))?;
    Ok(repo)
  }

  /// 获取仓库状态（类似 `git status`）
  pub fn get_status(repo: &Repository) -> Result<Vec<(String, Vec<String>)>> {
    let mut opts = StatusOptions::new();
    opts.include_untracked(true).recurse_untracked_dirs(true);

    let mut report = Vec::new();
    let statuses = repo.statuses(Some(&mut opts))?;

    for entry in statuses.iter() {
      let path = entry.path().unwrap_or("").to_string();
      let mut flags = Vec::new();
      let s: Status = entry.status();

      if s.is_index_new() || s.is_wt_new() {
        flags.push("new".into());
      }
      if s.is_index_modified() || s.is_wt_modified() {
        flags.push("modified".into());
      }
      if s.is_index_deleted() || s.is_wt_deleted() {
        flags.push("deleted".into());
      }

      report.push((path, flags));
    }

    Ok(report)
  }

  /// 添加所有改动到 index（类似 `git add .`）
  pub fn add_all(repo: &Repository) -> Result<()> {
    let mut index = repo.index()?;
    index.add_all(["*"].iter(), IndexAddOption::DEFAULT, None)?;
    index.write()?;
    Ok(())
  }

  /// 提交当前 index 到仓库
  pub fn commit_all(repo: &Repository, message: &str) -> Result<String> {
    // 准备 Signature
    let sig = repo.signature().context("Failed to create signature")?;

    // 写入 index tree
    let mut index = repo.index()?;
    let tree_id = index.write_tree()?;
    let tree = repo.find_tree(tree_id)?;

    // 获取父 commit（如果有）
    let parent_commits = if let Ok(head) = repo.head() {
      if let Ok(parent) = head.peel_to_commit() {
        vec![parent]
      } else {
        Vec::new()
      }
    } else {
      Vec::new()
    };

    let parents: Vec<&git2::Commit> = parent_commits.iter().collect();

    // 创建 commit
    let oid = repo.commit(Some("HEAD"), &sig, &sig, message, &tree, &parents[..])?;

    Ok(oid.to_string())
  }
}
