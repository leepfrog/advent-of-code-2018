extern crate puzzle_1b;

use puzzle_1b::frequencer;
use std::env;
use std::fs::File;
use std::io::prelude::*;
use std::io::BufReader;

fn main() {
    let args: Vec<String> = env::args().collect();

    if args.len() != 2 {
        panic!("Usage: cargo run <file_name>");
    }

    let path = &args[1];
    let sequence = parse_file(path).expect("Unable to parse file");
    let frequencer =
        frequencer::new(&sequence).expect("Unable to convert file contents to numeric");

    println!("Total is: {}", frequencer.sum());
    println!("Resonance is: {}", frequencer.find_resonance());
}

fn parse_file(path: &String) -> std::io::Result<(Vec<String>)> {
    let file = File::open(path)?;
    let reader = BufReader::new(file);
    let lines = reader.lines().map(|l| l.unwrap()).collect();

    Ok(lines)
}
