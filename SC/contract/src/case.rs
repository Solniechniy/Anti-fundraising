use crate::*;

pub const NEAR_ACCOUNT: &str = "near";

#[derive(BorshDeserialize, BorshSerialize, Serialize, Deserialize, PartialEq, Debug)]
#[serde(crate = "near_sdk::serde")]
pub enum HapiCategory {
    None,
    WalletService,
    MerchantService,
    MiningPool,
    LowRiskExchange,
    MediumRiskExchange,
    DeFi,
    OTCBroker,
    ATM,
    Gambling,
    IllicitOrganization,
    Mixer,
    DarknetService,
    Scam,
    Ransomware,
    Theft,
    Counterfeit,
    TerroristFinancing,
    Sanctions,
    ChildAbuse,
}

/// Auction information for creating new auction.
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct CaseInput {
    pub title: String,
    pub description: String,
    pub ipfs: String,
    pub category: HapiCategory,
}

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct CaseOutput {
    pub title: String,
    pub description: String,
    pub date: U64,
    pub ipfs: String,
    pub category: HapiCategory,
    pub num_addresses: u64,
}

/// Case information.
#[derive(BorshSerialize, BorshDeserialize)]
pub enum VCase {
    Current(Case),
}

#[derive(BorshSerialize, BorshDeserialize)]
pub struct Case {
    pub title: String,
    pub description: String,
    pub date: Timestamp,
    pub category: HapiCategory,
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
                title: case.title,
                description: case.description,
                date: case.date.into(),
                ipfs: case.ipfs,
                category: case.category,
                num_addresses: case.addresses.len()
            },
        }
    }
}

impl VCase {
    pub fn new(case_id: u64, case_input: CaseInput) -> Self {
        Self::Current(Case {
            title: case_input.title,
            description: case_input.description,
            date: env::block_timestamp_ms(),
            ipfs: case_input.ipfs,
            category: case_input.category,
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
        case.date = env::block_timestamp_ms();

        self.cases.insert(&case_id, &VCase::Current(case));
    }
}
