// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;

fn main() {
  tauri::Builder::default()
    .setup(|app| {
      #[cfg(debug_assertions)] // only include this code on debug builds
      {
        let window = app.get_window("main").unwrap();
        window.open_devtools();
      }
      Ok(())
    })
    .plugin(tauri_plugin_window_state::Builder::default().build())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
