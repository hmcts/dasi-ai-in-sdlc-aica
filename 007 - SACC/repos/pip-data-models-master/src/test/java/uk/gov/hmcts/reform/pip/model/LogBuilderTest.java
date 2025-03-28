package uk.gov.hmcts.reform.pip.model;

import org.junit.jupiter.api.Test;
import uk.gov.hmcts.reform.pip.model.enums.UserActions;

import java.time.LocalDateTime;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static uk.gov.hmcts.reform.pip.model.LogBuilder.writeLog;

class LogBuilderTest {

    private static final UUID USER_UUID = UUID.randomUUID();
    private static final String USER_EMAIL = "bob@test.com";
    private static final UserActions USER_ACTION = UserActions.UPLOAD;
    private static final String ACTION_VALUE = "testFile.pdf";
    private static final LocalDateTime NOW = LocalDateTime.now();
    private static final String TEST_MESSAGE = "Returned String should match with date trimmed for testing purposes";

    private static final String RETURNED_STRING = String.format("Track: %s, %s %s, at %s", USER_EMAIL,
                                                                USER_ACTION.actionLog, ACTION_VALUE, NOW);

    private static final String RETURNED_STRING_NO_EMAIL = String.format("Track: %s %s, at %s",
                                                                USER_ACTION.actionLog, ACTION_VALUE, NOW);

    private static final String RETURNED_STRING_ONLY_VALUE = String.format("Track: %s, at %s",
                                                                ACTION_VALUE, NOW);

    private static final String RETURNED_STRING_ONLY_USER_VALUE = String.format("Track: %s, %s, at %s",
                                                                                USER_UUID, ACTION_VALUE, NOW);

    @Test
    void testWriteLog() {
        assertEquals(RETURNED_STRING.substring(0, RETURNED_STRING.length() - 10),
                     writeLog(USER_EMAIL, USER_ACTION, ACTION_VALUE).substring(0, RETURNED_STRING.length() - 10),
                     TEST_MESSAGE);
    }

    @Test
    void testWriteLogNoEmail() {
        assertEquals(RETURNED_STRING_NO_EMAIL.substring(0, RETURNED_STRING_NO_EMAIL.length() - 10),
                     writeLog(USER_ACTION, ACTION_VALUE).substring(0, RETURNED_STRING_NO_EMAIL.length() - 10),
                     TEST_MESSAGE);
    }

    @Test
    void testWriteLogOnlyValue() {
        assertEquals(RETURNED_STRING_ONLY_VALUE.substring(0, RETURNED_STRING_ONLY_VALUE.length() - 10),
                     writeLog(ACTION_VALUE).substring(0, RETURNED_STRING_ONLY_VALUE.length() - 10),
                     TEST_MESSAGE);
    }

    @Test
    void testWriteLogOnlyUserAndValue() {
        assertEquals(RETURNED_STRING_ONLY_USER_VALUE.substring(0, RETURNED_STRING_ONLY_USER_VALUE.length() - 10),
                     writeLog(USER_UUID, ACTION_VALUE).substring(0, RETURNED_STRING_ONLY_USER_VALUE.length() - 10),
                     TEST_MESSAGE);
    }
}
