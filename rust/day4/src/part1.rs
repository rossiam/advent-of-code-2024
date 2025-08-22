use std::fs;


fn main() {
    let input_data = fs::read_to_string("input.txt").expect("Could not read input file.");
	let puzzle_data: Vec<Vec<char>> = input_data
		.lines()
		.filter(|line| !line.is_empty())
		.map(|line| line.chars().collect::<Vec<_>>())
		.collect::<Vec<_>>();

	let mut num_matches = 0;
	let num_rows = puzzle_data.len() as isize;
	// Assuming all rows are the same length
	let num_columns = puzzle_data[0].len() as isize;

	let matches_at = |chars: &Vec<char>, row_index: isize, column_index: isize, dir: (isize, isize)| -> bool {
		let mut row_index = row_index;
		let mut column_index = column_index;
		for chr in chars {
			if row_index < 0 || row_index >= num_rows
					|| column_index < 0 || column_index >= num_columns
					|| puzzle_data[row_index as usize][column_index as usize] != *chr {
				return false;
			}
			row_index += dir.1;
			column_index += dir.0;
		}
		true
	};

	let xmas = vec!['X', 'M', 'A', 'S'];
	for row_index in 0..num_rows {
		for column_index in 0..num_columns {
			for x_dir in -1..=1 {
				for y_dir in -1..=1 {
					if x_dir == 0 && y_dir == 0 {
						// going nowhere here!
						continue;
					}
					if matches_at(&xmas, row_index, column_index, (x_dir, y_dir)) {
						num_matches += 1;
					}
				}
			}
		}
	}

	println!("{num_matches}");
}
