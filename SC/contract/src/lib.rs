use near_contract_standards::fungible_token::receiver::FungibleTokenReceiver;
use near_contract_standards::non_fungible_token::{Token, TokenId};
use near_sdk::borsh::{self, BorshDeserialize, BorshSerialize};
use near_sdk::collections::{LookupMap, UnorderedMap, LookupSet, UnorderedSet};
use near_sdk::json_types::{U128, U64};
use near_sdk::serde::{Deserialize, Serialize};
use near_sdk::{
    assert_one_yocto, env, ext_contract, is_promise_success, log, near_bindgen, serde_json,
    AccountId, Balance, BorshStorageKey, Gas, PanicOnDefault, Promise, PromiseOrValue,
    PromiseResult, Timestamp, ONE_YOCTO,
};

pub mod case;
pub mod address;
pub mod getters;
pub mod owner;

pub use crate::case::*;
pub use crate::address::*;
pub use getters::*;
pub use owner::*;

const GAS_GET_NFT_TOKEN: Gas = Gas(5_000_000_000_000);
const NO_DEPOSIT: Balance = 0;
const GAS_FOR_FT_TRANSFER: Gas = Gas(10_000_000_000_000);
const GAS_FOR_AFTER_FT_TRANSFER: Gas = Gas(10_000_000_000_000);
const GAS_FOR_CREATE_AUCTION: Gas = Gas(5_000_000_000_000);
const GAS_FOR_CALLBACK_TRANSFER_NFT: Gas = Gas(5_000_000_000_000);
const REFUND_GAS: Gas = Gas(20_000_000_000_000);

const MAX_VALID_DATE: u64 = 10_000_000_000_000_000_000; // 2286 year

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
        let this = Self {
            owner_id,
            cases: UnorderedMap::new(StorageKey::Cases),
            admins: UnorderedSet::new(StorageKey::Admins),
        };
        this
    }
}
