pub struct Frequencer {
  pub int_sequence: Vec<i32>,
}

pub fn new(sequence: &Vec<String>) -> Result<Frequencer, String> {
  let int_sequence = parse_str_to_int(sequence)?;

  Ok(Frequencer { int_sequence })
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
}
