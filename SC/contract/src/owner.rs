use crate::*;

pub trait Ownable {
    fn assert_owner(&self);
    fn owner(&self) -> &AccountId;
    fn transfer_ownership(&mut self, owner: AccountId);
}

#[near_bindgen]
impl Ownable for Contract {
    fn owner(&self) -> &AccountId {
        &self.owner_id
    }

    fn transfer_ownership(&mut self, owner: AccountId) {
        self.assert_owner();
        self.owner_id = owner;
    }

    fn assert_owner(&self) {
        assert_eq!(
            &env::predecessor_account_id(),
            self.owner(),
            "ERR_MUST_BE_OWNER"
        );
    }
}

pub trait Owner {
    fn add_admin(&mut self, account_id: AccountId);
}

#[near_bindgen]
impl Owner for Contract {
    fn add_admin(&mut self, account_id: AccountId) {
        self.assert_owner();

        self.admins.insert(&account_id);
    }
}
