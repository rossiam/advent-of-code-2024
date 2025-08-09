
pub fn is_safe(parts: &Vec<i32>) -> bool {
	if parts.len() < 2 || parts[0] == parts[1] {
		return false;
	}
	if parts[0] < parts[1] {
		for index in 0..parts.len() - 1 {
			if parts[index + 1] - parts[index] < 1 || parts[index + 1] - parts[index] > 3 {
				return false;
			}
		}
	} else {
		for index in 0..parts.len() - 1 {
			if parts[index] - parts[index + 1] < 1 || parts[index] - parts[index + 1] > 3 {
				return false;
			}
		}
	}
	true
}
