package uk.gov.hmcts.reform.pip.model.subscription;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@EqualsAndHashCode
@JsonPropertyOrder({"id", "channel", "searchType", "searchValue", "userID"})
public class Subscription {
    /**
     * Unique subscription ID.
     */
    @Schema(hidden = true)
    private UUID id;

    /**
     *  P&I user id.
     **/
    @Schema(example = "e.g. 410129ka214k")
    @Valid
    @NotNull
    @NotBlank
    private String userId;

    @Valid
    @NotNull
    private SearchType searchType;

    @Schema(example = "Value to categorise your entry")
    @Valid
    @NotNull
    @NotBlank
    private String searchValue;

    @Valid
    @NotNull
    private Channel channel;

    @Schema(hidden = true)
    private LocalDateTime createdDate = LocalDateTime.now();

    @Valid
    private String caseNumber;

    @Valid
    private String caseName;

    @Valid
    private String partyNames;

    @Valid
    private String urn;

    @Valid
    private String locationName;

    @Valid
    private LocalDateTime lastUpdatedDate;

    @Valid
    private List<String> listType;
}
