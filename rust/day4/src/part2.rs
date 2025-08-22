use std::fs;


fn main() {
    let input_data = fs::read_to_string("input.txt").expect("Could not read input file.");
	let puzzle_data: Vec<Vec<char>> = input_data
		.lines()
		.filter(|line| !line.is_empty())
		.map(|line| line.chars().collect::<Vec<_>>())
		.collect::<Vec<_>>();

	let mut num_matches = 0;
	let num_rows = puzzle_data.len();
	// Assuming all rows are the same length
	let num_columns = puzzle_data[0].len();

	let matches_at = |row_index: usize, column_index: usize| -> bool {
		if puzzle_data[row_index][column_index] == 'A' {
			let corner_values = [
				puzzle_data[row_index - 1][column_index - 1],
				puzzle_data[row_index - 1][column_index + 1],
				puzzle_data[row_index + 1][column_index + 1],
				puzzle_data[row_index + 1][column_index - 1],
			];
			let num_m = corner_values.iter().filter(|&&c| c == 'M').count();
			let num_s = corner_values.iter().filter(|&&c| c == 'S').count();
			num_m == 2 && num_s == 2 && corner_values[0] != corner_values[2]
		} else {
			false
		}
	};

	for row_index in 1..num_rows - 1 {
		for column_index in 1..num_columns - 1 {
			if matches_at(row_index, column_index) {
				num_matches += 1;
			}
		}
	}

	println!("{num_matches}");
}
