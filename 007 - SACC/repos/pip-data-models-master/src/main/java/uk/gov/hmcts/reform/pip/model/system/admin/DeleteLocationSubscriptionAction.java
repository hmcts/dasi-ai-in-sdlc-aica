package uk.gov.hmcts.reform.pip.model.system.admin;

import lombok.Getter;
import lombok.Setter;

/**
 * A specific model which represents the delete location subscription action.
 */
@Getter
@Setter
public class DeleteLocationSubscriptionAction extends SystemAdminAction {

    /**
     * The details about the delete location subscription action.
     */
    private String detailString;

    public DeleteLocationSubscriptionAction() {
        super();
        this.changeType = ChangeType.DELETE_LOCATION_SUBSCRIPTION;
    }

    @Override
    public String createAdditionalChangeDetail() {
        return detailString;
    }
}

