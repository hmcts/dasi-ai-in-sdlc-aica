package uk.gov.hmcts.reform.pip.model.system.admin;

import lombok.Getter;
import lombok.Setter;

/**
 * A specific model which represents the delete location action.
 */
@Getter
@Setter
public class DeleteLocationAction extends SystemAdminAction {

    /**
     * The details about the delete location action.
     */
    private String detailString;

    public DeleteLocationAction() {
        super();
        this.changeType = ChangeType.DELETE_LOCATION;
    }

    @Override
    public String createAdditionalChangeDetail() {
        return detailString;
    }
}
