let S = (x) => (y) => (z) => x(z)(y(z)); // Sxyz -> xz(yz)
let K = (x) => (y) => x; // Kxy -> x

// Derived combinators (using names from "To Mock a Mockingbird")
let I = S(K)(K); // Ix -> x
let M = S(I)(I); // Mx -> xx
let B = S(K(S))(K); // Bxyz -> x(yz)
let C = S(B(B)(S))(K(K)); // Cxyz -> xzy
let T = C(I); // Txy -> yx // See also S(K(SI))xy -> yx
let R = B(B)(T); // Rxyz -> yzx
let F = B(C)(R); // Fxyz = zyx
let V = C(F); // Vxyz = zxy
let L = C(B)(M); // Lxy = x(yy) // Test also CSM)

// Unused for now
// let D = B(B); // Dxyzw -> xy(zw)
// let B1 = B(B)(B); // B1xyzw -> x(yzw)
// let E = B(B1); // Exyzwv -> xy(zwv)

// Boolean logic
let TRUE = K; // TRUExy -> x
let FALSE = K(I); // FALSExy -> y

// Barendregt numerals (different from Church numerals)
// TODO: study these combinators more
let ZERO = I;
let IS_ZERO = T(TRUE);
let SUCC = V(FALSE);
let PRED = T(FALSE);

let ONE = SUCC(ZERO);
let TWO = SUCC(ONE);
let THREE = SUCC(TWO);
let FOUR = SUCC(THREE);
let FIVE = SUCC(FOUR);

// Z combinator for eager evaluation (wraps recursive call in a thunk)
let Z = (f) => ((x) => f((v) => x(x)(v)))((x) => f((v) => x(x)(v)));
let ADD_FIVE_F = (f) => (n) => IS_ZERO(n)(() => FIVE)(() => SUCC(f(PRED(n))))();
let ADD_FIVE_CHEAT = Z(ADD_FIVE_F);

// Pure combinator version (will cause stack overflow in eager JS)
// let ADD_FIVE_A1 = S(C(IS_ZERO)(FIVE))(S(K(S(K)(SUCC)))(S(K(S(I))(K(PRED)))));
// let ADD_FIVE = ADD_FIVE_A1(L(ADD_FIVE_A1)(L(ADD_FIVE_A1))); // Y combinator

// For Barendregt/Smullyan arithmetical birds
// For church numerals, we would do:
// let toNumber = (n) => n((x) => x + 1)(0);
let toNumber = (n) => (IS_ZERO(n) === TRUE ? 0 : 1 + toNumber(PRED(n)));

let O = S(I);
let SAGE = S(L)(L);
let A = SAGE(O);

console.log(toNumber(ADD_FIVE_CHEAT(FIVE)));
