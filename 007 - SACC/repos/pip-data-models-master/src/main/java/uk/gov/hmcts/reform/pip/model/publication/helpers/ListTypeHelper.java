package uk.gov.hmcts.reform.pip.model.publication.helpers;

import org.apache.commons.text.WordUtils;
import uk.gov.hmcts.reform.pip.model.publication.ListType;

import java.util.Arrays;
import java.util.Locale;
import java.util.Set;
import java.util.stream.Collectors;

public final class ListTypeHelper {
    private static final Set<String> ACRONYMS = Set.of("COP", "ET", "IAC", "SSCS", "SJP");
    private static final Set<String> CONJUNCTIONS = Set.of("and");

    private ListTypeHelper() {
    }

    public static String buildFriendlyName(ListType listType) {
        return Arrays.stream(WordUtils.capitalizeFully(listType.name(), '_').split("_"))
            .map(word -> ACRONYMS.contains(word.toUpperCase(Locale.ENGLISH))
                ? word.toUpperCase(Locale.ENGLISH) : word)
            .map(word -> CONJUNCTIONS.contains(word.toLowerCase(Locale.ENGLISH))
                ? word.toLowerCase(Locale.ENGLISH) : word)
            .collect(Collectors.joining(" "));
    }
}
