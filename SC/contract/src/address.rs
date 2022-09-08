use crate::*;

pub const NEAR_ACCOUNT: &str = "near";

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub enum Status {
    Pending,
    Accepted,
    Rejected,
}

/// Account deposits for the a auction.
#[derive(BorshSerialize, BorshDeserialize)]
pub enum VAddress {
    Current(Address),
}

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct Address {
    pub chain: String,
    pub date: Timestamp,
    pub reporter: AccountId,
    pub address: String,
    pub ipfs: String,
    pub status: Status,
}

impl From<VAddress> for Address {
    fn from(v_account_auction: VAddress) -> Self {
        match v_account_auction {
            VAddress::Current(account_auction) => account_auction,
        }
    }
}

/// Auction information for creating new auction.
#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct AddressInput {
    pub chain: String,
    pub address: String,
    pub ipfs: String,
}

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize)]
#[serde(crate = "near_sdk::serde")]
pub struct AddressOutput {
    pub chain: String,
    pub date: U64,
    pub reporter: AccountId,
    pub address: String,
    pub ipfs: String,
    pub status: Status,
}

impl From<VAddress> for AddressOutput {
    fn from(v_address: VAddress) -> Self {
        match v_address {
            VAddress::Current(address) => AddressOutput {
                chain: address.chain,
                date: address.date.into(),
                reporter: address.reporter,
                address: address.address,
                ipfs: address.ipfs,
                status: address.status,
            },
        }
    }
}

impl VAddress {
    pub fn new(address_input: AddressInput) -> Self {
        Self::Current(Address {
            chain: address_input.chain,
            reporter: env::predecessor_account_id(),
            date: env::block_timestamp_ms(),
            ipfs: address_input.ipfs,
            address: address_input.address,
            status: Status::Pending,
        })
    }
}

pub trait AddressManagment {
    fn create_address(&mut self, case_id: u64, address: AddressInput);
    fn update_address_link(
        &mut self,
        case_id: u64,
        address: String,
        chain: String,
        ipfs_link: String,
    );
    fn update_status(&mut self, case_id: u64, address: String, chain: String, status: Status);
}

#[near_bindgen]
impl AddressManagment for Contract {
    fn create_address(&mut self, case_id: u64, address: AddressInput) {
        let mut case: Case = self.cases.get(&case_id).expect("ERR: no such case").into();
        let address_id = format!("{}{}", address.chain, address.address);

        case.addresses.insert(&address_id, &VAddress::new(address));

        case.date = env::block_timestamp_ms();

        self.cases.insert(&case_id, &VCase::Current(case));
    }

    fn update_address_link(
        &mut self,
        case_id: u64,
        address: String,
        chain: String,
        ipfs_link: String,
    ) {
        assert!(
            self.admins.contains(&env::predecessor_account_id()),
            "ERR: you have not access"
        );

        let mut case: Case = self
            .cases
            .get(&case_id)
            .expect("ERR: case not found")
            .into();

        let address_id = format!("{}{}", chain, address);

        let mut address: Address = case
            .addresses
            .get(&address_id)
            .expect("ERR: address not found")
            .into();

        address.ipfs = ipfs_link;
        address.date = env::block_timestamp_ms();

        case.addresses
            .insert(&address_id, &VAddress::Current(address));
        case.date = env::block_timestamp_ms();

        self.cases.insert(&case_id, &VCase::Current(case));
    }

    fn update_status(&mut self, case_id: u64, address: String, chain: String, status: Status) {
        assert!(
            self.admins.contains(&env::predecessor_account_id()),
            "ERR: you have not access"
        );

        let mut case: Case = self
            .cases
            .get(&case_id)
            .expect("ERR: case not found")
            .into();

        let address_id = format!("{}{}", chain, address);

        let mut address: Address = case
            .addresses
            .get(&address_id)
            .expect("ERR: address not found")
            .into();

        address.status = status;
        address.date = env::block_timestamp_ms();

        case.addresses
            .insert(&address_id, &VAddress::Current(address));
        case.date = env::block_timestamp_ms();

        self.cases.insert(&case_id, &VCase::Current(case));
    }
}
