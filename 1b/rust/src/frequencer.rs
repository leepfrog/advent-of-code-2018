use std::collections::HashSet;

pub struct Frequencer {
  pub int_sequence: Vec<i32>,
  pub max_attempts: u32,
}

pub fn new(sequence: &Vec<String>) -> Result<Frequencer, String> {
  let int_sequence = parse_str_to_int(sequence)?;
  let max_attempts = 999999;

  Ok(Frequencer {
    int_sequence,
    max_attempts,
  })
}

fn parse_str_to_int(str_sequence: &Vec<String>) -> Result<Vec<i32>, String> {
  return str_sequence.iter().map(parse).collect();
}

fn parse(input: &String) -> Result<i32, String> {
  match input.parse::<i32>() {
    Ok(n) => Ok(n),
    Err(_) => Err(format!("Unable to parse: {:?}", input)),
  }
}

impl Frequencer {
  pub fn sum(&self) -> i32 {
    let mut sum = 0;

    for num in &self.int_sequence {
      sum += num;
    }

    return sum;
  }

  pub fn find_resonance(&self) -> i32 {
    let mut cursor: u32 = 0;
    let mut total = 0;
    let length = self.int_sequence.len() as u32;
    let mut sums = HashSet::new();
    sums.insert(0);

    while cursor < *&self.max_attempts {
      let index = (cursor % length) as usize;
      let number = self.int_sequence[index];
      total += number;

      if sums.contains(&total) {
        return total;
      }

      sums.insert(total);
      cursor += 1;
    }

    panic!(
      "Max attempts exceeded while attempting to find resonance: {} tries",
      &self.max_attempts
    );
  }
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn it_parses_string_to_int() {
    let given = &String::from("35");
    let expected = 35;

    assert_eq!(expected, parse(given).unwrap());
  }

  #[test]
  fn it_parses_a_plus_sign_to_int() {
    let given = &String::from("+35");
    let expected = 35;

    assert_eq!(expected, parse(given).unwrap());
  }

  #[test]
  fn it_errors_on_unknown_symbols() {
    let given = &String::from("~35");
    assert!(
      parse(given).is_err(),
      "should return error on unparsable string"
    );
  }

  #[test]
  fn it_returns_the_correct_sum() {
    let given: Vec<String> = [String::from("+5"), String::from("-2"), String::from("+3")].to_vec();
    let expected = 6;
    let frequencer = new(&given);
    assert_eq!(expected, frequencer.unwrap().sum());
  }

  #[test]
  fn it_should_pass_positive_scenario_1_find_resonance() {
    let given = vec![-1, 1];
    let expected = 0;

    let mut frequencer = new(&vec![]).unwrap();
    frequencer.int_sequence = given;
    let actual = frequencer.find_resonance();

    assert_eq!(expected, actual);
  }

  #[test]
  fn it_should_pass_positive_scenario_2_find_resonance() {
    let given = vec![3, 3, 4, -2, -4];
    let expected = 10;

    let mut frequencer = new(&vec![]).unwrap();
    frequencer.int_sequence = given;
    let actual = frequencer.find_resonance();

    assert_eq!(expected, actual);
  }

  #[test]
  fn it_should_pass_positive_scenario_3_find_resonance() {
    let given = vec![-6, 3, 8, 5, -6];
    let expected = 5;

    let mut frequencer = new(&vec![]).unwrap();
    frequencer.int_sequence = given;
    let actual = frequencer.find_resonance();

    assert_eq!(expected, actual);
  }

  #[test]
  fn it_should_pass_positive_scenario_4_find_resonance() {
    let given = vec![7, 7, -2, -7, -4];
    let expected = 14;

    let mut frequencer = new(&vec![]).unwrap();
    frequencer.int_sequence = given;
    let actual = frequencer.find_resonance();

    assert_eq!(expected, actual);
  }

  #[test]
  fn it_should_pass_positive_scenario_5_find_resonance() {
    let given = vec![1, -2, 3, 1];
    let expected = 2;

    let mut frequencer = new(&vec![]).unwrap();
    frequencer.int_sequence = given;
    let actual = frequencer.find_resonance();

    assert_eq!(expected, actual);
  }

  #[test]
  #[should_panic(expected = "Max attempts exceeded while attempting to find resonance: 3 tries")]
  fn it_should_pass_throw_after_max_attempts_find_resonance() {
    let given = vec![1];

    let mut frequencer = new(&vec![]).unwrap();
    frequencer.int_sequence = given;
    frequencer.max_attempts = 3;

    frequencer.find_resonance();
  }

}
