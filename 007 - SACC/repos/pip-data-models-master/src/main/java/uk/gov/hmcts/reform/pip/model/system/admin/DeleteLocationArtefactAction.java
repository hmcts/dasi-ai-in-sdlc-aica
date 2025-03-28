package uk.gov.hmcts.reform.pip.model.system.admin;

import lombok.Getter;
import lombok.Setter;

/**
 * A specific model which represents the location artefact deletion action.
 */
@Getter
@Setter
public class DeleteLocationArtefactAction extends SystemAdminAction  {

    /**
     * The details about the delete location artefact action.
     */
    private String detailString;

    public DeleteLocationArtefactAction() {
        super();
        this.changeType = ChangeType.DELETE_LOCATION_ARTEFACT;
    }

    @Override
    public String createAdditionalChangeDetail() {
        return detailString;
    }
}
