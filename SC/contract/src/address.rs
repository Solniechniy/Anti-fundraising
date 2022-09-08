use crate::*;

pub const NEAR_ACCOUNT: &str = "near";

#[derive(BorshSerialize, BorshDeserialize, Serialize, Deserialize, PartialEq, Debug)]
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
    pub date: u64,
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
    pub date: u64,
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
                date: address.date,
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
            date: env::block_timestamp(),
            ipfs: address_input.ipfs,
            address: address_input.address,
            status: Status::Pending,
        })
    }
}

#[near_bindgen]
#[allow(dead_code)]
impl Contract {
    pub fn create_address(&mut self, case_id: u64, address: AddressInput) {
        let mut case: Case = self.cases.get(&case_id).expect("ERR: no such case").into();
        let address_id = format!("{}{}", address.chain, address.address);

        case.addresses.insert(&address_id, &VAddress::new(address));
    }
}
