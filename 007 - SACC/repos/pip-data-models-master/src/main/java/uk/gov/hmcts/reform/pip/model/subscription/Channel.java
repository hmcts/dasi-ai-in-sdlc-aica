package uk.gov.hmcts.reform.pip.model.subscription;

/**
 * An enum which represents the subscription channel for publications.
 */
public enum Channel {
    EMAIL("EMAIL"),
    API_COURTEL("API");

    public final String notificationRoute;

    Channel(String notificationRoute) {
        this.notificationRoute = notificationRoute;
    }
}
