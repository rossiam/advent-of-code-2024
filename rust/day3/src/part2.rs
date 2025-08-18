use std::fs;

use regex::Regex;


fn main() {
    let input_data = fs::read_to_string("input.txt").expect("Could not read input file.");

    let re = Regex::new(r"(mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\))").unwrap();

	let mut do_mul = true;
	let mut sum = 0;
	for (_, [cmd]) in re.captures_iter(&input_data).map(|cap| cap.extract()) {
		if cmd == "do()" {
			do_mul = true;
		} else if cmd == "don't()" {
			do_mul = false;
		} else {
			if do_mul {
				let parts: Vec<_> = cmd[4..cmd.len() - 1].split(',').collect();
				sum += parts[0].parse::<i32>().unwrap() * parts[1].parse::<i32>().unwrap();
			}
		}
	}

    println!("{sum}");
}
