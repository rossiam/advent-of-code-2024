use std::fs;

use regex::Regex;


fn main() {
    let input_data = fs::read_to_string("input.txt").expect("Could not read input file.");

	let re = Regex::new(r"mul\((\d{1,3}),(\d{1,3})\)").unwrap();

	let mut sum = 0;

	for (_, [a, b]) in re.captures_iter(&input_data).map(|cap| cap.extract()) {
		sum += a.parse::<i32>().unwrap() * b.parse::<i32>().unwrap();
	}

	println!("{sum}");
}
