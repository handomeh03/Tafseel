import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerException, ThrottlerGuard, ThrottlerLimitDetail } from '@nestjs/throttler';

@Injectable()
export class AppThrottlerGuard extends ThrottlerGuard {
  protected async throwThrottlingException(
    context: ExecutionContext,
    throttlerLimitDetail: ThrottlerLimitDetail,
  ): Promise<void> {
    const retryAfterSeconds = Math.ceil(throttlerLimitDetail.timeToBlockExpire / 1000);
    const isLogin = context.getHandler().name === 'login';

    const message = isLogin
      ? `محاولات تسجيل دخول كثيرة جداً. يرجى المحاولة مرة أخرى بعد ${retryAfterSeconds} ثانية.`
      : `طلبات كثيرة جداً. يرجى المحاولة مرة أخرى بعد ${retryAfterSeconds} ثانية.`;

    throw new ThrottlerException(message);
  }
}