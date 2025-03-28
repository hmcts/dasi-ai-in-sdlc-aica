package uk.gov.hmcts.reform.pip.model.system.admin;

import lombok.Getter;
import lombok.Setter;

/**
 * A specific model which represents the create system admin action.
 */
@Getter
@Setter
public class CreateSystemAdminAction extends SystemAdminAction {

    /**
     * The email address of the account that's trying to be created.
     */
    private String accountEmail;

    public CreateSystemAdminAction() {
        super();
        this.changeType = ChangeType.ADD_USER;
    }

    @Override
    public String createAdditionalChangeDetail() {
        return String.format("Attempted to create account for: %s", this.accountEmail);
    }
}
