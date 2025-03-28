package uk.gov.hmcts.reform.pip.model;

import uk.gov.hmcts.reform.pip.model.enums.UserActions;

import java.time.LocalDateTime;
import java.util.UUID;

public final class LogBuilder {

    private LogBuilder() {

    }

    public static String writeLog(String actioningUserEmail, UserActions userAction, String actionValue) {
        return String.format("Track: %s, %s %s, at %s", actioningUserEmail, userAction.actionLog, actionValue,
                             LocalDateTime.now());
    }

    public static String writeLog(UserActions userAction, String actionValue) {
        return String.format("Track: %s %s, at %s", userAction.actionLog, actionValue,
                             LocalDateTime.now());
    }

    public static String writeLog(String actionValue) {
        return String.format("Track: %s, at %s", actionValue, LocalDateTime.now());
    }

    public static String writeLog(UUID actioningUserId, String actionValue) {
        return String.format("Track: %s, %s, at %s", actioningUserId, actionValue, LocalDateTime.now());
    }


}
