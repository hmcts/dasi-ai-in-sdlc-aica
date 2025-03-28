package uk.gov.hmcts.reform.pip.model.location;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class Location {
    private static final String LIST_ARRAY = "list-array";
    private static final String DEFINITION = "text[]";

    private Integer locationId;

    private String name;

    private List<String> region;

    @NotNull
    private LocationType locationType;

    private List<String> jurisdiction;

    private List<LocationReference> locationReferenceList = new ArrayList<>();

    private String welshName;

    private List<String> welshJurisdiction;

    private List<String> welshRegion;

    private String email;

    private String contactNo;

    public Location(LocationCsv locationCsv) {
        this.locationId = locationCsv.getUniqueId();
        this.name = locationCsv.getLocationName();
        this.region = new ArrayList<>(locationCsv.getRegion());
        this.jurisdiction = new ArrayList<>(locationCsv.getJurisdiction());
        this.locationType = LocationType.valueOfCsv(locationCsv.getProvenanceLocationType());
        LocationReference locationReference = new LocationReference(
            locationCsv.getProvenance(),
            locationCsv.getProvenanceLocationId(),
            LocationType.valueOfCsv(locationCsv.getProvenanceLocationType()));
        this.locationReferenceList.add(locationReference);
        this.welshName = locationCsv.getWelshLocationName();
        this.welshRegion = new ArrayList<>(locationCsv.getWelshRegion());
        this.welshJurisdiction = new ArrayList<>(locationCsv.getWelshJurisdiction());
        this.email = locationCsv.getEmail();
        this.contactNo = locationCsv.getContactNo();
    }

    /**
     * Adds a new LocationReference to the reference table.
     * @param locationReference The location reference object to add.
     */
    public void addLocationReference(LocationReference locationReference) {
        locationReferenceList.add(locationReference);
    }
}
