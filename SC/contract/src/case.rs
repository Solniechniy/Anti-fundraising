use near_sdk::collections::LazyOption;

use crate::*;

pub const NEAR_ACCOUNT: &str = "near";

/// Auction information for creating new auction.
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct CaseInput {
    pub name: String,
    pub description: String,
    pub ipfs: String,
}

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct CaseOutput {
    pub name: String,
    pub description: String,
    pub date: u64,
    pub ipfs: String,
}

/// Case information.
#[derive(BorshSerialize, BorshDeserialize)]
pub enum VCase {
    Current(Case),
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct Case {
    pub name: String,
    pub description: String,
    pub date: u64,
    pub ipfs: String,
    pub addresses: UnorderedMap<String, VAddress>,
}

impl From<VCase> for Case {
    fn from(v_case: VCase) -> Self {
        match v_case {
            VCase::Current(case) => case,
        }
    }
}

impl From<VCase> for CaseOutput {
    fn from(v_case: VCase) -> Self {
        match v_case {
            VCase::Current(case) => CaseOutput {
                name: case.name,
                description: case.description,
                date: case.date,
                ipfs: case.ipfs,
            },
        }
    }
}

impl VCase {
    pub fn new(case_id: u64, case_input: CaseInput) -> Self {
        Self::Current(Case {
            name: case_input.name,
            description: case_input.description,
            date: env::block_timestamp(),
            ipfs: case_input.ipfs,
            addresses: UnorderedMap::new(StorageKey::Addresses { case_id }),
        })
    }
}

#[near_bindgen]
#[allow(dead_code)]
impl Contract {
    pub fn create_case(&mut self, case: CaseInput) -> u64 {
        let case_id = self.cases.len();

        self.cases.insert(&case_id, &VCase::new(case_id, case));

        case_id
    }
}
