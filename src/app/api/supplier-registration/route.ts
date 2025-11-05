import { NextResponse } from 'next/server';
import { z } from 'zod';

const supplierFormSchema = z.object({
  userType: z.enum([
    'Coffee Estate Owner',
    'Member of Farmer-Producer Organisation',
    'Coffee Curing Works',
    'Individual Farmer',
    'Brokers / Traders',
  ]),
  email: z.string().email('Invalid email address'),
  mobileNumber: z.string().min(5, 'Mobile number is required'),
  country: z.string().min(1, 'Country is required'),

  // Coffee Estate Owner
  estateName: z.string().optional(),
  estateOwnerName: z.string().optional(),
  surveyNumber: z.string().optional(),
  address: z.string().optional(),

  // FPO
  fpoName: z.string().optional(),
  fpoAddress: z.string().optional(),
  registrationNumber: z.string().optional(),
  memberName: z.string().optional(),

  // Curing Works
  promoterName: z.string().optional(),
  licenceNumber: z.string().optional(),
  curingWorksAddress: z.string().optional(),
  contactPerson: z.string().optional(),

  // Individual / Brokers
  fullName: z.string().optional(),
  aadharCardNumber: z.string().optional(),

  // New fields
  certifications: z
    .array(
      z.enum([
        'UTZ Certified',
        'Rainforest Alliance',
        'Fairtrade',
        'Birdfriendly',
        'Nespresso AAA',
        'Starbucks C.A.F.E',
        '4C',
        'Any Other',
      ])
    )
    .optional(),
  otherCertificationName: z.string().optional(),
  isOrganic: z.enum(['Yes', 'No']).optional(),

  productsAvailable: z
    .string()
    .min(10, 'Please describe your products (minimum 10 characters)'),
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();

    // Dynamically enforce required fields based on user type
    let validationSchema = supplierFormSchema;
    if (payload.userType === 'Coffee Estate Owner') {
      validationSchema = validationSchema.refine(
        (data) => !!data.estateName && !!data.estateOwnerName && !!data.surveyNumber && !!data.address,
        { message: 'All Coffee Estate Owner fields are required', path: ['estateName'] }
      );
    } else if (payload.userType === 'Member of Farmer-Producer Organisation') {
      validationSchema = validationSchema.refine(
        (data) => !!data.fpoName && !!data.fpoAddress && !!data.registrationNumber && !!data.memberName,
        { message: 'All FPO fields are required', path: ['fpoName'] }
      );
    } else if (payload.userType === 'Coffee Curing Works') {
      validationSchema = validationSchema.refine(
        (data) => !!data.promoterName && !!data.licenceNumber && !!data.curingWorksAddress && !!data.contactPerson,
        { message: 'All Coffee Curing Works fields are required', path: ['promoterName'] }
      );
    } else if (payload.userType === 'Individual Farmer') {
      validationSchema = validationSchema.refine(
        (data) => !!data.fullName && !!data.aadharCardNumber,
        { message: 'All Individual Farmer fields are required', path: ['fullName'] }
      );
    } else if (payload.userType === 'Brokers / Traders') {
      validationSchema = validationSchema.refine(
        (data) => !!data.fullName && !!data.registrationNumber && !!data.address,
        { message: 'All Broker/Trader fields are required', path: ['fullName'] }
      );
    }

    validationSchema.parse(payload);

    // At this point, you can insert into a DB or send an email.
    // For now, respond success.
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, issues: error.issues }, { status: 400 });
    }
    return NextResponse.json({ ok: false, message: 'Unexpected error' }, { status: 500 });
  }
}