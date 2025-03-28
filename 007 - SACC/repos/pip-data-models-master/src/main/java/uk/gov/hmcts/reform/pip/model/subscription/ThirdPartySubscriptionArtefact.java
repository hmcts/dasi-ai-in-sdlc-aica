package uk.gov.hmcts.reform.pip.model.subscription;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import uk.gov.hmcts.reform.pip.model.publication.Artefact;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ThirdPartySubscriptionArtefact {
    @NotNull
    String apiDestination;

    @NotNull
    Artefact artefact;
}
