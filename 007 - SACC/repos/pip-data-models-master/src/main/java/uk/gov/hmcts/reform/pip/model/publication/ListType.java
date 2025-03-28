package uk.gov.hmcts.reform.pip.model.publication;

import lombok.AllArgsConstructor;
import lombok.Getter;
import uk.gov.hmcts.reform.pip.model.account.Roles;
import uk.gov.hmcts.reform.pip.model.account.UserProvenances;
import uk.gov.hmcts.reform.pip.model.location.LocationType;
import uk.gov.hmcts.reform.pip.model.publication.helpers.ListTypeHelper;

import java.util.List;

import static uk.gov.hmcts.reform.pip.model.account.Roles.ALL_VERIFIED_THIRD_PARTY_CFT_ROLES;
import static uk.gov.hmcts.reform.pip.model.account.Roles.ALL_VERIFIED_THIRD_PARTY_CRIME_ROLES;
import static uk.gov.hmcts.reform.pip.model.account.Roles.ALL_VERIFIED_THIRD_PARTY_PRESS_ROLES;
import static uk.gov.hmcts.reform.pip.model.account.UserProvenances.CFT_IDAM;
import static uk.gov.hmcts.reform.pip.model.account.UserProvenances.CRIME_IDAM;
import static uk.gov.hmcts.reform.pip.model.account.UserProvenances.PI_AAD;
import static uk.gov.hmcts.reform.pip.model.location.LocationType.NATIONAL;
import static uk.gov.hmcts.reform.pip.model.location.LocationType.OWNING_HEARING_LOCATION;
import static uk.gov.hmcts.reform.pip.model.location.LocationType.VENUE;

/**
 * Enum that represents the different list types.
 */
@Getter
@AllArgsConstructor
public enum ListType {
    SJP_PUBLIC_LIST(NATIONAL, PI_AAD, ALL_VERIFIED_THIRD_PARTY_PRESS_ROLES),
    SJP_PRESS_LIST(NATIONAL, PI_AAD, ALL_VERIFIED_THIRD_PARTY_PRESS_ROLES, null,
                   "SJP Press List (Full list)"),
    SJP_DELTA_PRESS_LIST(NATIONAL, PI_AAD, ALL_VERIFIED_THIRD_PARTY_PRESS_ROLES, SJP_PRESS_LIST,
                         "SJP Press List (New Cases)"),
    SJP_PRESS_REGISTER(NATIONAL, PI_AAD, ALL_VERIFIED_THIRD_PARTY_PRESS_ROLES),
    CROWN_DAILY_LIST(VENUE, CRIME_IDAM, ALL_VERIFIED_THIRD_PARTY_CRIME_ROLES),
    CROWN_FIRM_LIST(VENUE, CRIME_IDAM, ALL_VERIFIED_THIRD_PARTY_CRIME_ROLES),
    CROWN_WARNED_LIST(VENUE, CRIME_IDAM, ALL_VERIFIED_THIRD_PARTY_CRIME_ROLES),
    MAGISTRATES_PUBLIC_LIST(VENUE, CRIME_IDAM, ALL_VERIFIED_THIRD_PARTY_CRIME_ROLES),
    MAGISTRATES_STANDARD_LIST(VENUE, CRIME_IDAM, ALL_VERIFIED_THIRD_PARTY_CRIME_ROLES),
    CIVIL_DAILY_CAUSE_LIST(VENUE, CFT_IDAM, ALL_VERIFIED_THIRD_PARTY_CFT_ROLES),
    FAMILY_DAILY_CAUSE_LIST(VENUE, CFT_IDAM, ALL_VERIFIED_THIRD_PARTY_CFT_ROLES),
    CIVIL_AND_FAMILY_DAILY_CAUSE_LIST(VENUE, CFT_IDAM, ALL_VERIFIED_THIRD_PARTY_CFT_ROLES),
    COP_DAILY_CAUSE_LIST(VENUE, CFT_IDAM, ALL_VERIFIED_THIRD_PARTY_CFT_ROLES),
    ET_FORTNIGHTLY_PRESS_LIST(OWNING_HEARING_LOCATION, CFT_IDAM, ALL_VERIFIED_THIRD_PARTY_CFT_ROLES),
    ET_DAILY_LIST(OWNING_HEARING_LOCATION, CFT_IDAM, ALL_VERIFIED_THIRD_PARTY_CFT_ROLES),
    SSCS_DAILY_LIST(OWNING_HEARING_LOCATION, CFT_IDAM, ALL_VERIFIED_THIRD_PARTY_CFT_ROLES),
    SSCS_DAILY_LIST_ADDITIONAL_HEARINGS(OWNING_HEARING_LOCATION, CFT_IDAM, ALL_VERIFIED_THIRD_PARTY_CFT_ROLES,
                                        SSCS_DAILY_LIST, "SSCS Daily List - Additional Hearings"),
    IAC_DAILY_LIST(VENUE, CFT_IDAM, ALL_VERIFIED_THIRD_PARTY_CFT_ROLES),
    CARE_STANDARDS_LIST(NATIONAL, CFT_IDAM, ALL_VERIFIED_THIRD_PARTY_CFT_ROLES),
    PRIMARY_HEALTH_LIST(NATIONAL, CFT_IDAM, ALL_VERIFIED_THIRD_PARTY_CFT_ROLES);

    /**
     * Flag that represents the Location Type level the list displays at.
     */
    private final LocationType listLocationLevel;

    /**
     * Allowed user provenance for accessing the list.
     */
    private final UserProvenances allowedProvenance;

    /**
     * Allowed third party roles for accessing the list.
     */
    private final List<Roles> allowedThirdPartyRoles;

    /**
     * Indicates the parent list type where this list type is based on.
     */
    private ListType parentListType;

    /**
     * Friendly name of the list if it is different to the list type name.
     */
    private String friendlyName;

    ListType(LocationType listLocationLevel, UserProvenances allowedProvenance, List<Roles> allowedThirdPartyRoles) {
        this.listLocationLevel = listLocationLevel;
        this.allowedProvenance = allowedProvenance;
        this.allowedThirdPartyRoles = allowedThirdPartyRoles;
    }

    public String getFriendlyName() {
        return friendlyName == null ? ListTypeHelper.buildFriendlyName(this) : friendlyName;
    }
}
