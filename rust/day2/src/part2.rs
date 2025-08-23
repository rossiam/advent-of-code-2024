use std::fs;

use day2::is_safe;

fn is_safe_enough(parts: &Vec<i32>) -> bool {
	if is_safe(parts) {
		true
	} else {
		for index in 0..parts.len() {
			let mut modified_parts = parts.clone();
			modified_parts.remove(index);
			if is_safe(&modified_parts) {
				return true;
			}
		}
		false
	}
}

fn main() {
	// TODO: rename this back to input_data.
    let stupidly_named_variable = fs::read_to_string("input.txt").expect("Could not read input file.");

    let reports = stupidly_named_variable
        .lines()
        .filter(|line| !line.is_empty())
        .map(|line| {
            line.split_whitespace().map(|part| part.parse::<i32>().unwrap()).collect::<Vec<_>>()
		})
		.filter(|parts| is_safe_enough(parts))
		.count();

	println!("{:?}", reports);
}
