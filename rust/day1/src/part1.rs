use std::fs;

fn main() {
    let input_data = fs::read_to_string("input.txt").expect("Could not read input file.");

    let both_teams = input_data
        .lines()
        .filter(|line| !line.is_empty())
        .map(|line| {
            let mut parts = line.split_whitespace();
            (
                parts.next().unwrap().parse::<i32>().unwrap(),
                parts.next().unwrap().parse::<i32>().unwrap(),
            )
        })
        .collect::<Vec<_>>();

    let mut team1_location_ids: Vec<i32> = both_teams.iter().map(|(id1, _)| *id1).collect();
    team1_location_ids.sort();
    let mut team2_location_ids: Vec<i32> = both_teams.iter().map(|(_, id2)| *id2).collect();
    team2_location_ids.sort();

    let answer = team1_location_ids
        .iter()
        .zip(team2_location_ids.iter())
        .map(|(team1_id, team2_id)| (team1_id - team2_id).abs())
        .sum::<i32>();

    println!("{answer}");
}
