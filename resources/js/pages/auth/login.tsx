import { Form, Head, Link } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <Head title="Login | Permata Indonesia" />

            <div className="max-w-md w-full">
                {/* Logo and Branding */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-block">
                        <img src="/logo/permata.png" alt="Permata Indonesia" className="h-20 w-20 object-contain mx-auto" />
                    </Link>
                    <h2 className="mt-6 text-3xl font-bold text-[#0B1727]">
                        Login ke Akun
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Masuk untuk mengakses dashboard PERMATA INDONESIA
                    </p>
                </div>

                {status && (
                    <div className="mb-6 rounded-md bg-green-50 p-4">
                        <div className="text-sm font-medium text-green-800">
                            {status}
                        </div>
                    </div>
                )}

                <Form
                    {...store.form()}
                    resetOnSuccess={['password']}
                    className="bg-white p-8 rounded-xl shadow-lg"
                >
                    {({ processing, errors }) => (
                        <div className="space-y-5">
                            <div>
                                <Label htmlFor="email" className="text-[#0B1727] font-semibold">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    className="mt-1 border-gray-300 focus:border-[#FACC15] focus:ring-[#FACC15] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-[#0B1727] font-semibold">Password</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-sm text-[#FACC15] hover:text-yellow-600"
                                            tabIndex={5}
                                        >
                                            Lupa password?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    className="mt-1 border-gray-300 focus:border-[#FACC15] focus:ring-[#FACC15] text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="border-gray-300 text-[#FACC15] focus:ring-[#FACC15]"
                                />
                                <Label htmlFor="remember" className="text-gray-700">Ingat saya</Label>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-[#FACC15] text-[#0B1727] hover:bg-yellow-500 font-bold py-3"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && <Spinner />}
                                LOGIN
                            </Button>
                        </div>
                    )}
                </Form>

                <div className="mt-6 text-center">
                    <Link
                        href="/"
                        className="text-sm text-[#0B1727] hover:text-[#FACC15] font-medium"
                    >
                        ← Kembali ke Beranda
                    </Link>
                </div>
            </div>
        </div>
    );
}
