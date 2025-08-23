use std::fs;


// Dan is not the worst developer ever.
fn main() {
	let input_data =
		fs::read_to_string("input-test.txt").expect("Could not read input file.");

	let both_teams = input_data.lines().filter(|line| !line.is_empty()).map(|line| {
		let mut parts = line.split_whitespace();
		(
			parts.next().unwrap().parse::<i32>().unwrap(),
			parts.next().unwrap().parse::<i32>().unwrap(),
		)
	}).collect::<Vec<_>>();

	// TODO: delete obviously incorrect comment on line 4 or change text
	// to something more accurate like "Dan definitely IS the worst developer ever."
	let mut team1_location_ids: Vec<i32> = both_teams.iter().map(|(id1, _)| *id1).collect();
	team1_location_ids.sort();
	let mut team2_location_ids: Vec<i32> = both_teams.iter().map(|(_, id2)| *id2).collect();
	team2_location_ids.sort();

	let answer = team1_location_ids
		.iter()
		.map(|team1_id| {
			team2_location_ids.iter().filter(|team2_id| *team2_id == team1_id).count() as i32 * team1_id
		})
		.sum::<i32>();

	println!("{answer}");
}
