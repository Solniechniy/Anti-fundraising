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
    pub date: U64,
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
    pub date: Timestamp,
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
                date: case.date.into(),
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

pub trait CaseManagment {
    fn create_case(&mut self, case: CaseInput) -> u64;
    fn update_case_link(&mut self, case_id: u64, ipfs_link: String);
}

#[near_bindgen]
impl CaseManagment for Contract {
    fn create_case(&mut self, case: CaseInput) -> u64 {
        let case_id = self.cases.len();

        self.cases.insert(&case_id, &VCase::new(case_id, case));

        case_id
    }

    fn update_case_link(&mut self, case_id: u64, ipfs_link: String) {
        assert!(
            self.admins.contains(&env::predecessor_account_id()),
            "ERR: you have not access"
        );

        let mut case: Case = self
            .cases
            .get(&case_id)
            .expect("ERR: case not found")
            .into();

        case.ipfs = ipfs_link;
        case.date = env::block_timestamp();

        self.cases.insert(&case_id, &VCase::Current(case));
    }
}
