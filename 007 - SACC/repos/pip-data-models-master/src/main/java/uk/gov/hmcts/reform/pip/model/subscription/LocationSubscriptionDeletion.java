package uk.gov.hmcts.reform.pip.model.subscription;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LocationSubscriptionDeletion {
    @NotNull
    String locationName;

    @NotNull
    List<String> subscriberEmails = new ArrayList<>();
}
