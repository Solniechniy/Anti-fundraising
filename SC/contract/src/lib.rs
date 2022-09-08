use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{UnorderedMap, UnorderedSet};
use near_sdk::json_types::{U128, U64};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{
    env, ext_contract, near_bindgen, AccountId, BorshStorageKey, PanicOnDefault, Promise,
    PromiseOrValue, Timestamp,
};

pub mod address;
pub mod case;
pub mod getters;
pub mod owner;

pub use crate::address::*;
pub use crate::case::*;
pub use getters::*;
pub use owner::*;

#[ext_contract(ext_self)]
pub trait ExtContract {
    /// Callback after account creation.
    fn on_create_account(&mut self, new_account_id: AccountId) -> Promise;

    fn after_ft_on_transfer_near_deposit(
        &mut self,
        sender_id: AccountId,
        deposit_amount: U128,
    ) -> PromiseOrValue<U128>;
}

#[derive(BorshStorageKey, BorshSerialize)]
pub(crate) enum StorageKey {
    Addresses { case_id: u64 },
    Cases,
    Admins,
}

#[near_bindgen]
#[derive(BorshSerialize, BorshDeserialize, PanicOnDefault)]
struct Contract {
    owner_id: AccountId,
    cases: UnorderedMap<u64, VCase>,
    admins: UnorderedSet<AccountId>,
}

#[near_bindgen]
impl Contract {
    #[allow(dead_code)]
    #[init]
    pub fn new(owner_id: AccountId) -> Self {
        Self {
            owner_id,
            cases: UnorderedMap::new(StorageKey::Cases),
            admins: UnorderedSet::new(StorageKey::Admins),
        }
    }
}
