import Text "mo:base/Text";
import Char "mo:base/Char";
import Blob "mo:base/Blob";
import Types "types";
import Principal "mo:base/Principal";
import Array "mo:base/Array";

module {
    func process_character(char : Char) : Char {
        let unicode_value = Char.toNat32(char); // converted to nat32

        if (unicode_value >= 97 and unicode_value <= 122) {
            // ascii lowercase
            // leave as is
            return (Char.fromNat32(unicode_value));
        };
        if (unicode_value >= 65 and unicode_value <= 90) {
            // lowercase
            return (Char.fromNat32(unicode_value + 32));
        };
        if (unicode_value == 32) {
            // spaces to "-"
            return Char.fromNat32(45);
        };
        // remove everything else
        return Char.fromNat32(0);
    };

    public func slugify(word : Text) : Text {
        var slug : Text = "";
        var char : Char = '\u{0}';
        for (c in word.chars()) {
            char := process_character(c);
            if (char != '\u{0}') {
                slug #= Char.toText(char);
            };
        };
        slug;
    };

    let adminPrincipals : [Text] = [
        "4w6mb-vqaaa-aaaab-qac5q-cai"
    ];

    public func isAdmin(userPrincipal : Principal) : Bool {
        let userPrincipalStr = Principal.toText(userPrincipal);
        let foundAdmin = Array.find<Text>(
            adminPrincipals,
            func(adminPrincipal : Text) : Bool {
                return userPrincipalStr == adminPrincipal;
            },
        );

        switch (foundAdmin) {
            case (null) { return false };
            case (_) { return true };
        };
    };
};
