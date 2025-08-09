use std::fs;

use day2::is_safe;

fn main() {
    let input_data = fs::read_to_string("input.txt").expect("Could not read input file.");

    let reports = input_data
        .lines()
        .filter(|line| !line.is_empty())
        .map(|line| {
            line.split_whitespace().map(|part| part.parse::<i32>().unwrap()).collect::<Vec<_>>()
		})
		.filter(|parts| is_safe(parts))
		.count();

	println!("{:?}", reports);
}
