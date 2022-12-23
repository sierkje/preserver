import { validateEmail } from "./utils"

test("validateEmail returns false for non-emails", () => {
  expect(validateEmail(undefined)).toBe(false)
  expect(validateEmail(null)).toBe(false)
  expect(validateEmail("")).toBe(false)
  expect(validateEmail("not-an-email")).toBe(false)
  expect(validateEmail("n@")).toBe(false)
})

test("validateEmail returns true for emails", () => {
  expect(validateEmail("kody@example.com")).toBe(true)
})

/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInV0aWxzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoidXRpbHMudGVzdC50cyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHZhbGlkYXRlRW1haWwgfSBmcm9tIFwiLi91dGlsc1wiXG5cbnRlc3QoXCJ2YWxpZGF0ZUVtYWlsIHJldHVybnMgZmFsc2UgZm9yIG5vbi1lbWFpbHNcIiwgKCkgPT4ge1xuICBleHBlY3QodmFsaWRhdGVFbWFpbCh1bmRlZmluZWQpKS50b0JlKGZhbHNlKVxuICBleHBlY3QodmFsaWRhdGVFbWFpbChudWxsKSkudG9CZShmYWxzZSlcbiAgZXhwZWN0KHZhbGlkYXRlRW1haWwoXCJcIikpLnRvQmUoZmFsc2UpXG4gIGV4cGVjdCh2YWxpZGF0ZUVtYWlsKFwibm90LWFuLWVtYWlsXCIpKS50b0JlKGZhbHNlKVxuICBleHBlY3QodmFsaWRhdGVFbWFpbChcIm5AXCIpKS50b0JlKGZhbHNlKVxufSlcblxudGVzdChcInZhbGlkYXRlRW1haWwgcmV0dXJucyB0cnVlIGZvciBlbWFpbHNcIiwgKCkgPT4ge1xuICBleHBlY3QodmFsaWRhdGVFbWFpbChcImtvZHlAZXhhbXBsZS5jb21cIikpLnRvQmUodHJ1ZSlcbn0pXG4iXX0= */