use wasm_bindgen::prelude::*;
use std::collections::VecDeque;

#[wasm_bindgen]
pub struct NavMesh {
    nodes: Vec<NavNode>,
}

#[wasm_bindgen]
impl NavMesh {
    pub fn new() -> NavMesh {
        NavMesh { nodes: Vec::new() }
    }

    pub fn add_node(&mut self, id: u32, x: f32, z: f32, neighbors: Vec<u32>) {
        self.nodes.push(NavNode { id, x, z, neighbors });
    }

    pub fn find_path(&self, start_id: u32, goal_id: u32) -> Vec<u32> {
        // A* simplificado (apresentação)
        let mut came_from = std::collections::HashMap::new();
        let mut visited = std::collections::HashSet::new();
        let mut queue = VecDeque::new();
        queue.push_back(start_id);
        visited.insert(start_id);

        while let Some(current) = queue.pop_front() {
            if current == goal_id {
                // reconstruir caminho
                let mut path = vec![goal_id];
                let mut cur = goal_id;
                while let Some(&prev) = came_from.get(&cur) {
                    path.push(prev);
                    cur = prev;
                    if cur == start_id { break; }
                }
                path.reverse();
                return path;
            }
            if let Some(node) = self.nodes.iter().find(|n| n.id == current) {
                for &nei in &node.neighbors {
                    if !visited.contains(&nei) {
                        visited.insert(nei);
                        came_from.insert(nei, current);
                        queue.push_back(nei);
                    }
                }
            }
        }
        vec![]
    }
}

struct NavNode {
    id: u32,
    x: f32,
    z: f32,
    neighbors: Vec<u32>,
}