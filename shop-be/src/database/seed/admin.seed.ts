import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/users/entities/user.entity';
import { ROLES } from 'src/shared/constants/common/role.contanst';

export async function initAdmin(dataSource: DataSource) {
  const adminRepo = dataSource.getRepository(User);

  const adminEmail = process.env.INIT_ADMIN_EMAIL || 'admin@admin.com';
  const adminPassword = process.env.INIT_ADMIN_PASSWORD || 'admin123';

  const existed = await adminRepo.findOne({
    where: { email: adminEmail },
  });

  if (existed) {
    console.log('✅ Admin: true');
    return;
  }

  const admin = adminRepo.create({
    email: adminEmail,
    password: await bcrypt.hash(adminPassword, 10),
    role: ROLES.ADMIN,
  });

  await adminRepo.save(admin);

  console.log('🚀 Admin initialized successfully');
}
