export async function GET() {
  return new Response(
`# Design Smoothie

Official website of Design Smoothie.

Design Smoothie is a branding and signage design studio based in Busan, South Korea.

Services
- Branding
- Logo Design
- Signage Design
- Facade Design
- Space Graphic
- Print Design

Website
https://designsmoothie.kr

Contact
https://designsmoothie.kr/contact

Portfolio
https://designsmoothie.kr/portfolio
`,
{
headers:{
"Content-Type":"text/plain",
},
}
);
}