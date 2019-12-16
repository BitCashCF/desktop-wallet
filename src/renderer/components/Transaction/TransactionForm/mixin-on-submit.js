export default {
  methods: {
    /**
     * Decrypt the WIF of the wallet if has a password and submit the form
     */
    async onSubmit () {
      if (this.form.walletPassword && this.form.walletPassword.length) {
        this.showEncryptLoader = true

        const dataToDecrypt = {
          bip38key: this.currentWallet.passphrase,
          password: this.form.walletPassword,
          wif: this.walletNetwork.wif
        }

        try {
          const { encodedWif } = await this.bip38_decrypt(dataToDecrypt)
          this.form.passphrase = null
          this.form.wif = encodedWif
        } catch (_error) {
          this.$error(this.$t('ENCRYPTION.FAILED_DECRYPT'))
        }

        this.showEncryptLoader = false
      }

      this.submit()
    }
  }
}
