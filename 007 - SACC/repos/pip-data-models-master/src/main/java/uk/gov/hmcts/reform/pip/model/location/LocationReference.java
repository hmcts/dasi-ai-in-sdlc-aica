package uk.gov.hmcts.reform.pip.model.location;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

/**
 * This class captures the CourtReference, which contains the source ID for each court.
 */
@Getter
@Setter
@NoArgsConstructor
public class LocationReference {
    private UUID locationReferenceId;

    /**
     * The name of the source system.
     */
    private String provenance;

    /**
     * The id of the location as referred to by the source system.
     */
    private String provenanceLocationId;

    /**
     * The location type referred to by the location id, eg, the VENUE id of 3 rather than the REGION id of 3.
     */
    private LocationType provenanceLocationType;

    public LocationReference(String provenance, String provenanceLocationId, LocationType provenanceLocationType) {
        this.provenance = provenance;
        this.provenanceLocationId = provenanceLocationId;
        this.provenanceLocationType = provenanceLocationType;
    }
}
