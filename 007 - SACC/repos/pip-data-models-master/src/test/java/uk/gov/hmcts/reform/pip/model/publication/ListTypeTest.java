package uk.gov.hmcts.reform.pip.model.publication;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static uk.gov.hmcts.reform.pip.model.publication.ListType.CIVIL_AND_FAMILY_DAILY_CAUSE_LIST;
import static uk.gov.hmcts.reform.pip.model.publication.ListType.COP_DAILY_CAUSE_LIST;
import static uk.gov.hmcts.reform.pip.model.publication.ListType.MAGISTRATES_PUBLIC_LIST;
import static uk.gov.hmcts.reform.pip.model.publication.ListType.SSCS_DAILY_LIST_ADDITIONAL_HEARINGS;

class ListTypeTest {
    private static final String LIST_TYPE_NAME_MESSAGE = "List type name does not match";

    @Test
    void testStandardListTypeFriendlyName() {
        assertThat(MAGISTRATES_PUBLIC_LIST.getFriendlyName())
            .as(LIST_TYPE_NAME_MESSAGE)
            .isEqualTo("Magistrates Public List");
    }

    @Test
    void testListTypeWithAcronymFriendlyName() {
        assertThat(COP_DAILY_CAUSE_LIST.getFriendlyName())
            .as(LIST_TYPE_NAME_MESSAGE)
            .isEqualTo("COP Daily Cause List");
    }

    @Test
    void testListTypeWithConjunctionFriendlyName() {
        assertThat(CIVIL_AND_FAMILY_DAILY_CAUSE_LIST.getFriendlyName())
            .as(LIST_TYPE_NAME_MESSAGE)
            .isEqualTo("Civil and Family Daily Cause List");
    }

    @Test
    void testListTypeWithCustomFriendlyName() {
        assertThat(SSCS_DAILY_LIST_ADDITIONAL_HEARINGS.getFriendlyName())
            .as(LIST_TYPE_NAME_MESSAGE)
            .isEqualTo("SSCS Daily List - Additional Hearings");
    }
}
