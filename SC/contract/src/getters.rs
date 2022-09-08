use crate::*;

pub trait Getters {
    fn get_admins(&self) -> Vec<AccountId>;
    fn get_num_cases(&self) -> u64;
    fn get_cases(&self, from_index: u64, limit: u64) -> Vec<(u64, CaseOutput)>;
    fn get_addresses(&self, case_id: u64) -> Vec<AddressOutput>;
    fn get_case(&self, case_id: u64) -> CaseOutput;
}

#[near_bindgen]
impl Getters for Contract {
    fn get_admins(&self) -> Vec<AccountId> {
        self.admins.to_vec()
    }

    fn get_num_cases(&self) -> u64 {
        self.cases.len()
    }

    fn get_cases(&self, from_index: u64, limit: u64) -> Vec<(u64, case::CaseOutput)> {
        self.cases
            .iter()
            .skip(from_index as usize)
            .take(limit as usize)
            .map(|(id, acc)| (id, acc.into()))
            .collect()
    }

    fn get_case(&self, case_id: u64) -> CaseOutput {
        self.cases.get(&case_id).expect("ERR: case not found").into()
    }

    fn get_addresses(&self, case_id: u64) -> Vec<AddressOutput> {
        let case: Case = self
            .cases
            .get(&case_id)
            .expect("ERR: case not found")
            .into();

        case.addresses
            .iter()
            .map(|(_, address)| address.into())
            .collect()
    }
}
